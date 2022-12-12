const API_URL = "http://localhost:4000";
async function httpGetPlanets() { 
  // Load planets and return as JSON.
  const response = await fetch(`${API_URL}/planets`);
  return await response.json();
}

 // Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  const fetchedLaunches = await response.json();
  return fetchedLaunches.sort((a, b) => a.flightNumber - b.flightNumber);
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try{
    return await fetch(`${API_URL}/launches`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(launch)
    });
  } catch (e) {
    return { ok: false }
  }
}

async function httpAbortLaunch(id) {
  // Delete launch with given ID.
  try{
    return await fetch(`${API_URL}/launches/${id}`, {
      method: "DELETE",
    });
  } catch (e) {
    return { ok: false }
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};