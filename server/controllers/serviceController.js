const fs = require('fs');
const path = require('path');

let savedServices = [];
let hiredServices = [];

const servicesPath = path.join(__dirname, '../data/services.json');

const getServicesData = () => {
  const data = fs.readFileSync(servicesPath, 'utf8');
  return JSON.parse(data);
};

exports.getAllServices = (req, res, next) => {
  try {
    const services = getServicesData();
    res.status(200).json(services);
  } catch (error) {
    next(error);
  }
};

exports.addService = (req, res, next) => {
  try {
    if (!req.body) return res.status(400).json({ message: 'Request body is missing' });
    
    const { title, description, category, price, image } = req.body;
    
    // Simple validation
    if (!title || !price || !category) {
      return res.status(400).json({ message: 'Title, price, and category are required' });
    }

    const services = getServicesData();
    const newService = {
      id: services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1,
      title,
      description: description || 'No description provided.',
      category,
      price: parseFloat(price),
      rating: 5.0,
      image: image || 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=400'
    };

    services.push(newService);
    fs.writeFileSync(servicesPath, JSON.stringify(services, null, 2));
    
    res.status(201).json({ message: 'Service added successfully', service: newService });
  } catch (error) {
    next(error);
  }
};

exports.getServiceById = (req, res, next) => {
  try {
    const serviceId = parseInt(req.params.id);
    if (isNaN(serviceId)) {
      return res.status(400).json({ message: 'Invalid service ID format' });
    }

    const services = getServicesData();
    const service = services.find(s => s.id === serviceId);
    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    next(error);
  }
};

exports.saveService = (req, res, next) => {
  try {
    const { id } = req.body;
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ message: 'A valid Service ID is required' });
    }

    const services = getServicesData();
    const service = services.find(s => s.id === parseInt(id));

    if (!service) return res.status(404).json({ message: 'Service not found' });

    if (!savedServices.find(s => s.id === service.id)) {
      savedServices.push(service);
      res.status(200).json({ message: 'Service saved successfully', saved: savedServices });
    } else {
      res.status(400).json({ message: 'Service already saved' });
    }
  } catch (error) {
    next(error);
  }
};

exports.hireService = (req, res, next) => {
  try {
    const { id } = req.body;
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ message: 'A valid Service ID is required' });
    }

    const services = getServicesData();
    const service = services.find(s => s.id === parseInt(id));

    if (!service) return res.status(404).json({ message: 'Service not found' });

    if (!hiredServices.find(s => s.id === service.id)) {
      hiredServices.push(service);
      res.status(200).json({ message: 'Service hired successfully', hired: hiredServices });
    } else {
      res.status(400).json({ message: 'Service already hired' });
    }
  } catch (error) {
    next(error);
  }
};

exports.getSavedServices = (req, res, next) => {
  try {
    res.status(200).json(savedServices);
  } catch (error) {
    next(error);
  }
};

exports.getHiredServices = (req, res, next) => {
  try {
    res.status(200).json(hiredServices);
  } catch (error) {
    next(error);
  }
};
