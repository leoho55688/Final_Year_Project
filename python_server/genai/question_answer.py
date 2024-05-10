from langchain.chains import LLMChain
from langchain_google_vertexai import VertexAI
from langchain_core.prompts import PromptTemplate
from langchain_community.utilities import GoogleSerperAPIWrapper

def question_answer_service(question: str) -> str:
    search = GoogleSerperAPIWrapper()

    serper_result = search.run(question)

    template = """
    Answer the question with the help of provided context.
    Provide with clear instruction.

    Question: {question}

    Context:{context}
    """

    prompt = PromptTemplate(
        input_variables=["question", "context"],
        template=template
    )

    chain = LLMChain(
        llm=VertexAI(temperature=0, model="gemini-pro", max_output_tokens=2048),
        prompt=prompt,
        output_key="result"
    )
    result = chain.invoke({
        "question": question,
        "context": serper_result
    })

    return result["result"]