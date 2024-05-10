from langchain import hub
from langchain_core.prompts import PromptTemplate
from langchain_community.utilities import GoogleSerperAPIWrapper
from langchain_community.tools.tavily_search import TavilyAnswer
from langchain_google_vertexai import VertexAI
from langchain.chains import LLMChain
from dotenv import load_dotenv

load_dotenv()

from genai import multiple_choice

def topic_expand(topic: str) -> str:
    search = GoogleSerperAPIWrapper()

    serper_result = search.run("topic")

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
    Return the correct answer and more detailed explanation in an python dict with following fields:
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

topic = "Message Authentication Code and Digital Certificate"

expanded_topic = topic_expand(topic)
print(expanded_topic)

question = multiple_choice.CreateMultipleChoiceQuestion(expanded_topic)

result = evaluate_answer(question)
result = eval(result)

question.correct_answer = result["correct_answer"]
question.explanation = result["explanation"]

print(result)

result = check_relevence(topic, "How can mobile payments contribute to the development of smart cities?")
print(result)