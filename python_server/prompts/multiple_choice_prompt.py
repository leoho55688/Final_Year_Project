from langchain_core.prompts import PromptTemplate

template_1 ="""
Topic: {topic}

Step1 :

You are an university professor.
Based on the topic provided, describe the correct strategy to create a multiple choice question.
Describe the schema you would follow to set the question, answer and explanation
Be concise, but specific the process to allow a developer to implement it
The goal is to create a challenging multiple choice question with question, answer, correct answer and detailed explanation.

A:
"""

prompt_1 = PromptTemplate(
    input_variables=["topic"],
    template = template_1,                     
)

template_2 ="""
Step 2:

Follow the following schema to create three challenging multiple choice question.

Schema: {schema}

A:
"""

prompt_2 = PromptTemplate(
    input_variables=["schema"],
    template = template_2                      
)

template_3="""
Step 3:

Rank the questions by their quality and put them into an array.

{solutions}

A:
"""

prompt_3 = PromptTemplate(
    input_variables=["solutions"],
    template=template_3
)

template_4 ="""
Step 4:

Based on the given list of questions, give me the first ranking question in an python dict with following fields:
question: string, answers: string[], correct_answer: string, explanation: string

{review}

A:
"""

prompt_4 = PromptTemplate(
    input_variables=["review"],
    template = template_4                      
)