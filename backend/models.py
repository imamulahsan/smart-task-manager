from pydantic import BaseModel


class Task(BaseModel):
    id: int
    title: str
    description: str
    dueDate: str
    priority: str
    completed: bool
