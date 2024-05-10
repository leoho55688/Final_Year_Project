from genai import text_split
from testing import text_split_test

result = text_split.TextSplit(text_split_test.content)

print(result)