
let allServices = [];
let savedServiceIds = JSON.parse(localStorage.getItem('savedServiceIds') || '[]');
let hiredServiceIds = JSON.parse(localStorage.getItem('hiredServiceIds') || '[]');

window.onload = () => {
    fetchServices();
};

async function fetchServices() {
    UI.setLoading(true);
    try {
        allServices = await API.getServices();
        renderServices();
    } catch (error) {
        console.error(error);
        UI.showConfirm('Error', 'Failed to load services.');
    } finally {
        UI.setLoading(false);
    }
}

async function fetchDashboardData() {
    try {
        const saved = await API.getSaved();
        const hired = await API.getHired();
        UI.renderDashboardList('saved-list', saved);
        UI.renderDashboardList('hired-list', hired);
    } catch (error) {
        console.error(error);
    }
}

function showPage(pageId) {
    UI.showPage(pageId);
    if (pageId === 'dashboard') {
        fetchDashboardData();
    }
}

function setFilter(category) {
    showPage('services');
    document.getElementById('categoryFilter').value = category;
    renderServices();
}

function renderServices() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;
    const sortMode = document.getElementById('sortSelect').value;

    let filtered = allServices.filter(s => {
        const matchesSearch = s.title.toLowerCase().includes(query) || s.description.toLowerCase().includes(query);
        const matchesCategory = category === 'All' || s.category === category;
        const matchesPrice = s.price >= minPrice && s.price <= maxPrice;
        return matchesSearch && matchesCategory && matchesPrice;
    });

    if (sortMode === 'price-low') filtered.sort((a, b) => a.price - b.price);
    else if (sortMode === 'price-high') filtered.sort((a, b) => b.price - a.price);
    else if (sortMode === 'rating') filtered.sort((a, b) => b.rating - a.rating);

    UI.renderServices(filtered);
}

async function handleAddService(e) {
    e.preventDefault();
    const serviceData = {
        title: document.getElementById('newTitle').value,
        description: document.getElementById('newDesc').value,
        category: document.getElementById('newCategory').value,
        price: parseFloat(document.getElementById('newPrice').value)
    };

    const result = await API.addService(serviceData);
    if (result.ok) {
        UI.showConfirm('Success!', 'Gig published.');
        document.getElementById('addServiceForm').reset();
        fetchServices();
    } else {
        UI.showConfirm('Error', result.data.message);
    }
}

async function navigateToDetail(id) {
    showPage('details');
    try {
        const service = await API.getService(id);
        UI.renderDetail(service);
    } catch (error) {
        UI.showConfirm('Error', 'Failed to load details.');
    }
}

async function saveService(id) {
    const result = await API.saveService(id);
    if (result.ok) {
        savedServiceIds.push(id);
        localStorage.setItem('savedServiceIds', JSON.stringify(savedServiceIds));
        UI.showConfirm('Saved!', 'Added to dashboard.');
        fetchDashboardData();
    } else {
        UI.showConfirm('Oops', result.data.message);
    }
}

async function hireService(id) {
    const result = await API.hireService(id);
    if (result.ok) {
        hiredServiceIds.push(id);
        localStorage.setItem('hiredServiceIds', JSON.stringify(hiredServiceIds));
        UI.showConfirm('Hired!', 'You hired the freelancer.');
        fetchDashboardData();
    } else {
        UI.showConfirm('Oops', result.data.message);
    }
}

function handleSearch() { renderServices(); }
function closeConfirmModal() { UI.closeConfirm(); }
function allowDrop(ev) { ev.preventDefault(); ev.currentTarget.classList.add('drag-over'); }
function drag(ev, id) { ev.dataTransfer.setData("serviceId", id); }
function drop(ev, action) {
    ev.preventDefault();
    ev.currentTarget.classList.remove('drag-over');
    const id = ev.dataTransfer.getData("serviceId");
    if (action === 'save') saveService(id);
    else if (action === 'hire') hireService(id);
}

window.onclick = (event) => {
    const cModal = document.getElementById('confirmModal');
    if (event.target == cModal) UI.closeConfirm();
};
