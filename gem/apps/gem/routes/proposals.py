from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

fake_db = []

class Proposal(BaseModel):
    id: str
    title: str
    content: str


@router.post("/create")
async def proposal_create(proposal: Proposal):
    global fake_db
    proposal.id = len(fake_db) + 1
    fake_db.append(proposal)
    return proposal


@router.get("/")
async def proposal_list():
    global fake_db
    return fake_db
