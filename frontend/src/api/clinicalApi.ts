import axios from "axios";

import type { SummaryResponse } from "../types/summary";

const API_BASE_URL = "http://localhost:8000";

export const summarizeClinicalNote = async (
  note: string
): Promise<SummaryResponse> => {

  const response = await axios.post<SummaryResponse>(
    `${API_BASE_URL}/summarize`,
    {
      note,
    }
  );

  return response.data;
};