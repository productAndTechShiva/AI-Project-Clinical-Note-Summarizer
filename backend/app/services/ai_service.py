import requests
import json
import re


OLLAMA_URL = "http://localhost:11434/api/generate"



def parse_summary_sections(text: str):

    sections = {
        "patient_information": "",
        "medical_history": "",
        "clinical_findings": "",
        "recommendations": ""
    }

    current_section = None

    for line in text.splitlines():

        line = line.strip()

        if not line:
            continue

        upper_line = line.upper()

        if upper_line.startswith("PATIENT INFORMATION"):
            current_section = "patient_information"
            continue

        elif upper_line.startswith("MEDICAL HISTORY"):
            current_section = "medical_history"
            continue

        elif upper_line.startswith("CLINICAL FINDINGS"):
            current_section = "clinical_findings"
            continue

        elif upper_line.startswith("RECOMMENDATIONS"):
            current_section = "recommendations"
            continue

        if current_section:
            sections[current_section] += line + "\n"

    for key in sections:
        sections[key] = sections[key].strip()

    return sections



def summarize_clinical_note(note: str):

    prompt = f"""
You are an experienced clinical documentation assistant.

Analyze the clinical note and create a concise summary.

Return ONLY the following sections.

PATIENT INFORMATION:
<content>

MEDICAL HISTORY:
<content>

CLINICAL FINDINGS:
<content>

RECOMMENDATIONS:
<content>

Do not add any extra explanation.

Clinical Note:

{note}
"""

    try:

        response = requests.post(
            OLLAMA_URL,
            json={
                "model": "llama3.2:3b",
                "prompt": prompt,
                "stream": False
            },
            timeout=120
        )

        response.raise_for_status()

        ai_response = response.json()["response"]

        return parse_summary_sections(ai_response)

        # try:
        #     return json.loads(ai_response)

        # except Exception:

        #     return {
        #         "patient_information": "",
        #         "medical_history": "",
        #         "clinical_findings": ai_response,
        #         "recommendations": ""
        #     }

    except Exception as e:

        raise Exception(
            f"Ollama error: {str(e)}"
        )