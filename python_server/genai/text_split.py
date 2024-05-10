import re

from langchain.chains import LLMChain, SequentialChain
from langchain_google_vertexai import VertexAI
from langchain.schema import HumanMessage, SystemMessage

from prompts.text_split_prompt import TEXT_SPLITTER_SYSTEM, TEXT_SPLITTER_USER, prompt1

def TextSplit(content: str) -> list[dict]:
    content = content.replace("\"", "'")
    content = re.sub(r'\.\n+', '', content)

    chain_1 = LLMChain(
        llm=VertexAI(temperature=0, model="gemini-pro", max_output_tokens=4096),
        prompt=prompt1,
        output_key="result"
    )

    # chain_2 = LLMChain(
    #     llm=VertexAI(temperature=0, model="gemini-pro", max_output_tokens=4096),
    #     prompt=prompt_2,
    #     output_key="result"
    # )

    overall_chain = SequentialChain(
        chains=[chain_1],
        input_variables=["content"],
        output_variables=["result"],
        verbose=True
    )

    result = overall_chain.invoke({"content": content})
    result = result["result"].replace("\\n", "")
    # result = result[result.find("["):result.find("]")+1]

    return result

def text_splitter_llm(text: str) -> list[dict]:
    llm=VertexAI(temperature=0, model="gemini-pro", max_output_tokens=2048)
    text = text.replace("\"", "'")
    text = re.sub(r'\.\n+', '', text)

    messages = [
        SystemMessage(content=TEXT_SPLITTER_SYSTEM),
        HumanMessage(content=TEXT_SPLITTER_USER.format(content=text))
    ]

    data = llm.invoke(messages)
    print(data)
    text_list = eval(data)
    
    return text_list