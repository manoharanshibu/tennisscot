const API_ENDPOINT = 'https://5d7jeswgsk.execute-api.eu-west-2.amazonaws.com/uat';

export interface EvaluationData {
  'Player-ID': string;
  'Session-Id': string;
  'Centre_ID': string;
  'Coach_ID': string;
  'Comments': string;
  'Ft_Athl': number;
  'Ft_Head': number;
  'Ft_Heart': number;
  'Tn_Athl': number;
  'Tn_head': number;
  'Tn_Heart': number;
}

export async function submitPlayerEvaluation(data: EvaluationData): Promise<boolean> {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Evaluation submitted successfully:', result);
    return true;
  } catch (error) {
    console.error('Failed to submit evaluation:', error);
    return false;
  }
}