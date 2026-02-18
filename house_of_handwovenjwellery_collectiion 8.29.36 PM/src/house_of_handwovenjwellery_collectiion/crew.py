import os
from crewai import Agent, Crew, Process, Task, LLM
from crewai.project import CrewBase, agent, crew, task
from crewai_tools import FileReadTool, FileWriterTool

# Initialize Tools
file_read_tool = FileReadTool()
file_writer_tool = FileWriterTool()

# Define the Local LLM via Ollama
# Make sure you have run: ollama pull llama3.3
local_llm = LLM(
    model="ollama/qwen:0.5b",
    base_url="http://localhost:11434",
    temperature=0.3  # Lower temperature for more precise coding/SQL
)

@CrewBase
class EcommerceDevCrew():
    """Ecommerce Development Crew with Local Ollama LLM"""

    agents_config = 'config/agents.yaml'
    tasks_config = 'config/tasks.yaml'

    @agent
    def business_analyst(self) -> Agent:
        return Agent(
            config=self.agents_config['business_analyst'],
            llm=local_llm,
            tools=[file_read_tool],
            verbose=True,
            allow_delegation=False # Performance boost for local LLMs
        )

    @agent
    def database_engineer(self) -> Agent:
        return Agent(
            config=self.agents_config['database_engineer'],
            llm=local_llm,
            tools=[file_read_tool, file_writer_tool],
            verbose=True,
            allow_delegation=False
        )

    @agent
    def backend_developer(self) -> Agent:
        return Agent(
            config=self.agents_config['backend_developer'],
            llm=local_llm,
            tools=[file_read_tool, file_writer_tool],
            verbose=True,
            allow_delegation=False
        )

    @agent
    def full_stack_developer(self) -> Agent:
        return Agent(
            config=self.agents_config['full_stack_developer'],
            llm=local_llm,
            tools=[file_read_tool, file_writer_tool],
            verbose=True,
            allow_delegation=False
        )

    @agent
    def qa_engineer(self) -> Agent:
        return Agent(
            config=self.agents_config['qa_engineer'],
            llm=local_llm,
            verbose=True,
            allow_delegation=False
        )

    # @agent
    # def performance_engineer(self) -> Agent:
    #     return Agent(
    #         config=self.agents_config['performance_engineer'],
    #         llm=local_llm,
    #         verbose=True,
    #         allow_delegation=False
    #     )

    # Task mappings (Sequential Relay)
    @task
    def analysis_task(self) -> Task:
        return Task(config=self.tasks_config['analysis_task'])

    @task
    def database_design_task(self) -> Task:
        return Task(config=self.tasks_config['database_design_task'])

    @task
    def backend_development_task(self) -> Task:
        return Task(config=self.tasks_config['backend_development_task'])

    @task
    def frontend_development_task(self) -> Task:
        return Task(config=self.tasks_config['frontend_development_task'])

    @task
    def quality_assurance_task(self) -> Task:
        return Task(config=self.tasks_config['quality_assurance_task'])

    # @task
    # def performance_audit_task(self) -> Task:
    #     return Task(config=self.tasks_config['performance_audit_task'])

    @crew
    def crew(self) -> Crew:
        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential, # Crucial for local RAM management
            verbose=True
        )