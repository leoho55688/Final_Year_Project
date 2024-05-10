from langchain.chains import LLMChain, SequentialChain
from langchain_google_vertexai import VertexAI
from langchain_core.prompts import PromptTemplate
from langchain_community.utilities import GoogleSerperAPIWrapper

import prompts.multiple_choice_prompt as multiple_choice_prompt
from model.question import MCQuestion

def CreateMultipleChoiceQuestion(context:str) -> MCQuestion:
    chain1 = LLMChain(
        llm=VertexAI(temperature=0, model="gemini-pro", max_output_tokens=2048),
        prompt=multiple_choice_prompt.prompt_1,
        output_key="schema"
    )

    chain2 = LLMChain(
        llm=VertexAI(temperature=0.5, model="gemini-pro", max_output_tokens=2048),
        prompt=multiple_choice_prompt.prompt_2,
        output_key="solutions"
    )

    chain3 = LLMChain(
        llm=VertexAI(temperature=0, model="gemini-pro", max_output_tokens=2048),
        prompt=multiple_choice_prompt.prompt_3,
        output_key="review"
    )

    chain4 = LLMChain(
        llm=VertexAI(temperature=0, model="gemini-pro", max_output_tokens=2048),
        prompt=multiple_choice_prompt.prompt_4,
        output_key="ranked_solutions"
    )

    overall_chain = SequentialChain(
        chains=[chain1, chain2, chain3, chain4],
        input_variables=["topic"],
        output_variables=["ranked_solutions"],
        verbose=True
    )

    result = overall_chain.invoke({"topic": context})
    result = result["ranked_solutions"].replace("'", "\"")
    result = result.replace("\"s", "'s").replace("\"m", "'m").replace("\"re", "'re").replace("\"t", "'t")
    result = result[result.find("{"):result.find("}")+1]

    result_dict = eval(result)

    question = MCQuestion(
        result_dict["question"],
        result_dict["answers"],
        result_dict["correct_answer"],
        result_dict["explanation"]
        )

    return question

def topic_expand(topic: str) -> str:
    search = GoogleSerperAPIWrapper()

    serper_result = search.run(topic)

    template = """
    You were given a topic.
    Please expand the topic in three directions with additional knowledge.

    Topic: {topic}

    Knowledge: {serper_result}
    """

    prompt = PromptTemplate(
        input_variables=["topic", "serper_result"],
        template=template
    )

    chain = LLMChain(
        llm=VertexAI(temperature=0.5, model="gemini-pro", max_output_tokens=2048),
        prompt=prompt,
        output_key="result"
    )

    result = chain.invoke({
        "topic": topic,
        "serper_result": serper_result
    })

    return result["result"]

def check_relevence(topic:str, question) -> bool:
    template = """
    Check whether the given question is related to topic.
    Return True if they are related.
    Return False if they are not related.

    Topic: {topic}

    Question: {question}
    """

    prompt = PromptTemplate(
        input_variables=["topic", "question"],
        template=template
    )

    chain = LLMChain(
        llm=VertexAI(temperature=0, model="gemini-pro", max_output_tokens=2048),
        prompt=prompt,
        output_key="result"
    )
    result = chain.invoke({
        "topic": topic,
        "question": question
    })

    return "true" in result["result"].lower()

def evaluate_answer(question):
    search = GoogleSerperAPIWrapper()
    serper_result = search.run(question.question)

    template = """
    You were given a multiple choice question with answer and explanation.
    Please check whether the answer and explanation is correct with given knowledge.
    Return the correct answer and clear explanation in an python dict with following fields:
    correct_answer: string, explanation: string

    Question: {question}
    Asnwers: {answers}
    Correct_answer: {correct_answer}
    Explanation: {explanation}

    Knowledge: {serper_result}
    """

    prompt = PromptTemplate(
        input_variables=["question", "answers", "correct_answer", "explanation", "serper_result"],
        template=template
    )

    chain = LLMChain(
        llm=VertexAI(temperature=0, model="gemini-pro", max_output_tokens=2048),
        prompt=prompt,
        output_key="result"
    )
    result = chain.invoke({
        "question": question.question,
        "answers": question.answers,
        "correct_answer": question.correct_answer,
        "explanation": question.explanation,
        "serper_result": serper_result
    })

    result = result["result"]
    result = result[result.find("{"):result.find("}")+1]

    return result

def multiple_choice_service(topic:str):
    print("Topic: " + topic)
    expanded_topic = topic_expand(topic)
    print("Expanded Topic: " + expanded_topic)
    question = CreateMultipleChoiceQuestion(expanded_topic)
    relevance = check_relevence(topic, question.question)
    print(relevance)
    if not relevance: 
        return {
            "success": False
        }
    result = evaluate_answer(question)
    print(result)
    result = eval(result)

    question.correct_answer = result["correct_answer"]
    question.explanation = result["explanation"]

    return {
        "success": True,
        "question": {
            "question": question.question,
            "answers": question.answers,
            "correct_answer": result["correct_answer"],
            "explanation": result["explanation"]
        }
    }
