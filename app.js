// Configuration Setup
const SUPABASE_URL = "https://drubgjobavncwxnbhihg.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Nzzkf2cXWY40kT6NfiUtYA_JTB6GZq7";

async function fetchRecentJobs() {
  const feedContainer = document.getElementById("job-feed");

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/jobs?select=*&order=created_at.desc&limit=5`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      },
    );

    if (!response.ok) throw new Error("Failed to fetch jobs");

    const jobs = await response.json();
    feedContainer.innerHTML = "";

    if (jobs.length === 0) {
      feedContainer.innerHTML =
        '<div class="loading">No jobs posted today. Check back soon!</div>';
      return;
    }

    jobs.forEach((job) => {
      const jobElement = document.createElement("div");
      jobElement.className = "job-item";
      jobElement.innerHTML = `
        <div class="job-title">💼 <strong>${job.title}</strong> at ${job.company}</div>
        <div class="job-meta">
            <span>📍 ${job.location}</span>
            <a href="${job.link}" target="_blank" class="job-link">Apply Now 🔗</a>
        </div>
      `;
      feedContainer.appendChild(jobElement);
    });
  } catch (error) {
    console.error(error);
    feedContainer.innerHTML =
      '<div class="error-msg">⚠️ Couldn\'t load dynamic listings right now. Join our WhatsApp channel above for instant access!</div>';
  }
}

// Execute on load
document.addEventListener("DOMContentLoaded", fetchRecentJobs);
