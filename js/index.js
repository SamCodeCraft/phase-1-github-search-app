// Function to fetch user data from GitHub API based on username
        async function searchUsers(username) {
            const response = await fetch(`https://api.github.com/search/users?q=${username}`);
            const data = await response.json();
            return data.items;
        }

        // Function to fetch user repositories based on username
        async function getUserRepos(username) {
            const response = await fetch(`https://api.github.com/users/${username}/repos`);
            const data = await response.json();
            return data;
        }

        // Display user data
        function displayUsers(users) {
            const resultsContainer = document.getElementById('searchResults');
            resultsContainer.innerHTML = '';
            users.forEach(user => {
                const userElement = document.createElement('div');
                userElement.innerHTML = `
                    <div>
                        <img src="${user.avatar_url}" alt="${user.login}" style="width: 50px; height: 50px;">
                        <a href="${user.html_url}" target="_blank">${user.login}</a>
                        <button onclick="getUserRepositories('${user.login}')">Show Repositories</button>
                    </div>
                `;
                resultsContainer.appendChild(userElement);
            });
        }

        // Display user repositories
        async function displayUserRepositories(username) {
            const repos = await getUserRepos(username);
            const reposContainer = document.getElementById('userRepos');
            reposContainer.innerHTML = '';
            repos.forEach(repo => {
                const repoElement = document.createElement('div');
                repoElement.textContent = repo.full_name;
                reposContainer.appendChild(repoElement);
            });
        }

        // Event listener for form submission
        document.getElementById('searchForm').addEventListener('submit', async function(event) {
            event.preventDefault();
            const username = document.getElementById('searchInput').value;
            const users = await searchUsers(username);
            displayUsers(users);
        });

        // Function to get repositories when button is clicked
        async function getUserRepositories(username) {
            await displayUserRepositories(username);
        }