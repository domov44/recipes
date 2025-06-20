export class ApiServiceNode {
  async query(query: string): Promise<any> {
    const res = await fetch('https://www.api.masseur-electrique.fr/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} – ${res.statusText}`);
    }

    const data = await res.json();
    return data.data.products;
  }
}
