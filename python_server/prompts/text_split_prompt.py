from langchain.prompts import PromptTemplate

TEXT_SPLITTER_SYSTEM = """
You are a text splitter that split client text into a many chunks.
Please filter useless, meaningless information.
do not explain, do not comment, do not add empty lines, do not include redundant symbols.
ignore footers, for example:
Kehuan Zhang© All Rights Reserved Message Authentication Code and Digital Certificate IERG4130 2022
return in an array of python dict with the following fields:
title: string, content: string

Content: {content}
"""

TEXT_SPLITTER_USER = PromptTemplate(
    template="client text:\n{content}",
    input_variables=["content"]
)

prompt1 = PromptTemplate(
    template=TEXT_SPLITTER_SYSTEM,
    input_variables=["content"]
)