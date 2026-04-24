
const UI = {
    showPage(pageId) {
        document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
        document.getElementById(pageId + '-page').style.display = 'block';
    },

    setLoading(isLoading) {
        const loading = document.getElementById('loadingIndicator');
        if (loading) loading.style.display = isLoading ? 'block' : 'none';
    },

    renderServices(services) {
        const grid = document.getElementById('services-grid');
        if (!grid) return;
        grid.innerHTML = '';

        if (services.length === 0) {
            grid.innerHTML = '<p style="padding: 20px;">No matches found for your criteria.</p>';
            return;
        }

        services.forEach(service => {
            const card = document.createElement('div');
            card.className = 'service-card';
            card.draggable = true;
            card.id = `service-${service.id}`;
            card.ondragstart = (e) => drag(e, service.id);

            card.innerHTML = `
                <img src="${service.image}" alt="${service.title}" onclick="navigateToDetail(${service.id})">
                <div class="service-info">
                    <span class="category">${service.category}</span>
                    <h3 onclick="navigateToDetail(${service.id})">${service.title}</h3>
                    <p>${service.description.substring(0, 60)}...</p>
                    <div class="price">$${service.price}</div>
                    <div class="rating">⭐ ${service.rating}</div>
                    <div class="service-actions">
                        <button onclick="saveService(${service.id})">Save</button>
                        <button class="btn-hire" onclick="hireService(${service.id})">Hire</button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    },

    renderDashboardList(containerId, list) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';

        if (list.length === 0) {
            container.innerHTML = '<p class="hint">Nothing here yet.</p>';
            return;
        }

        list.forEach(item => {
            const miniCard = document.createElement('div');
            miniCard.className = 'mini-card';
            miniCard.innerHTML = `
                <img src="${item.image}" alt="">
                <div>
                    <strong>${item.title}</strong><br>
                    <small>$${item.price}</small>
                </div>
            `;
            container.appendChild(miniCard);
        });
    },

    renderDetail(service) {
        const container = document.getElementById('service-detail-content');
        if (!container) return;
        container.innerHTML = `
            <img class="detail-image" src="${service.image}" alt="${service.title}">
            <div class="detail-info">
                <span class="category-tag">${service.category}</span>
                <h2>${service.title}</h2>
                <div class="detail-meta">
                    <div><strong>Price:</strong> <span class="price" style="color:#28a745">$${service.price}</span></div>
                    <div><strong>Rating:</strong> ⭐ ${service.rating}</div>
                </div>
                <p style="font-size:18px; line-height:1.8; color:#555; margin-bottom:30px;">${service.description}</p>
                <div style="display:flex; gap:15px; flex-wrap: wrap;">
                    <button class="btn" style="flex:1; min-width: 150px; padding:15px; border:1px solid #0066cc; color:#0066cc; background:none; cursor:pointer; font-weight:bold; border-radius:4px;" onclick="saveService(${service.id})">Save for Later</button>
                    <button class="btn" style="flex:1; min-width: 150px; padding:15px; background:#0066cc; color:white; border:none; cursor:pointer; font-weight:bold; border-radius:4px;" onclick="hireService(${service.id})">Hire Now</button>
                </div>
            </div>
        `;
    },

    showConfirm(title, message) {
        const modal = document.getElementById('confirmModal');
        if (!modal) return;
        document.getElementById('confirmTitle').innerText = title;
        document.getElementById('confirmMessage').innerText = message;
        modal.style.display = 'block';
    },

    closeConfirm() {
        const modal = document.getElementById('confirmModal');
        if (modal) modal.style.display = 'none';
    }
};
