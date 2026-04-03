export interface AgentStep {
  id: number;
  label: string;
  duration: string;
  detail: string;
}

export interface ToolRegistryEntry {
  name: string;
  confidence: number;
  description: string;
}

export interface OutputResponse {
  status: string;
  tool_used: string;
  location: string;
  result: {
    temperature: number;
    unit: string;
    condition: string;
    humidity: number;
    wind_speed: string;
  };
  tokens_used: number;
  latency_ms: number;
}

export const mockAgentSteps: AgentStep[] = [
  {
    id: 1,
    label: "Parse Intent",
    duration: "12ms",
    detail: "NLP analysis of user query — location entity extracted",
  },
  {
    id: 2,
    label: "Select Tool",
    duration: "8ms",
    detail: "get_weather scored 97% confidence against tool registry",
  },
  {
    id: 3,
    label: "Execute API Call",
    duration: "18ms",
    detail: "GET /weather?q=Buenos+Aires&units=metric — 200 OK",
  },
  {
    id: 4,
    label: "Format Response",
    duration: "4ms",
    detail: "Structured output formatted for user consumption",
  },
];

export const mockToolRegistry: ToolRegistryEntry[] = [
  {
    name: "get_weather",
    confidence: 97,
    description: "Retrieves current weather data for a location",
  },
  {
    name: "search_web",
    confidence: 43,
    description: "Searches the web for real-time information",
  },
  {
    name: "read_file",
    confidence: 12,
    description: "Reads content from a local file path",
  },
];

export const mockOutputResponse: OutputResponse = {
  status: "success",
  tool_used: "get_weather",
  location: "Buenos Aires, AR",
  result: {
    temperature: 22,
    unit: "celsius",
    condition: "Partly Cloudy",
    humidity: 68,
    wind_speed: "14 km/h",
  },
  tokens_used: 284,
  latency_ms: 42,
};
