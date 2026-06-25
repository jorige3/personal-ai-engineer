from pydantic import BaseModel


class RepoRequest(BaseModel):
    repo_url: str
    repo_name: str


class ChatRequest(BaseModel):
    repo_name: str
    question: str


class ExplainFileRequest(BaseModel):
    repo_name: str
    file_path: str
    
class SearchCodeRequest(BaseModel):
    repo_name: str
    query: str
    n_results: int = 5