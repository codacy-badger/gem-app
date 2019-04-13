from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from routes import debug, auth, proposals


app = FastAPI(
    title="GEM",
    description="GBC Environment for meetings")

app.include_router(debug.router, prefix="/debug", tags=["debug"])
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(proposals.router, prefix="/proposals", tags=["proposals"])

app.add_middleware(CORSMiddleware,
                   allow_origins=['*'],
                   allow_headers=['*'],
                   allow_methods=['*'])
