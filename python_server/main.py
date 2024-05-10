from concurrent import futures
import grpc
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from dotenv import load_dotenv

load_dotenv()

from api.routes import api
from protos import genai_pb2_grpc
from model.grpc import GenerativeAIService
    
# def serve() -> None:
#     server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
#     genai_pb2_grpc.add_GenerativeAIServicer_to_server(GenerativeAIService(), server=server)
#     server.add_insecure_port("[::]:50051")
#     server.start()
#     print("gRPC server started on port 50051")
#     server.wait_for_termination()

def get_application() -> FastAPI:
    application = FastAPI()

    origins = [
        "http://localhost",
        "http://localhost:5173",
        "http://localhost:8080"
    ]

    application.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    application.include_router(api.router, prefix="/api")
    
    return application

app = get_application()

# if __name__ == "__main__":
#     # serve()