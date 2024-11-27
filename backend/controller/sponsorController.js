const Sponsor = require('../models/sponsor');

// Krijimi i një sponsori
const createSponsor = async (req, res) => {
  try {
    const sponsorData = {
      ...req.body,
      userId: req.user.id, 
    };
    const sponsor = await Sponsor.create(sponsorData);
    res.json(sponsor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getSponsors = async (req, res) => {
  try {
    const sponsors = await Sponsor.findAll({
      where: {
        userId: req.user.id, 
      },
    });
    res.json(sponsors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Përditësimi i një sponsori
const updateSponsor = async (req, res) => {
  try {
    const { id } = req.params;
    const sponsor = await Sponsor.findByPk(id);

    if (sponsor) {
      
      if (sponsor.userId !== req.user.id) {
        return res.status(403).json({ error: 'Nuk keni autorizim për të përditësuar këtë sponsor.' });
      }

      await sponsor.update(req.body);
      res.json(sponsor);
    } else {
      res.status(404).json({ error: 'Sponsori nuk u gjet.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fshirja e nje sponsori
const deleteSponsor = async (req, res) => {
  try {
    const { id } = req.params; 
    const sponsor = await Sponsor.findByPk(id);

    if (sponsor) {
   
      if (sponsor.userId !== req.user.id) {
        return res.status(403).json({ error: 'Nuk keni autorizim për të fshirë këtë sponsor.' });
      }

      await sponsor.destroy();
      res.json({ message: 'Sponsori u fshi.' });
    } else {
      res.status(404).json({ error: 'Sponsori nuk u gjet.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createSponsor,
  getSponsors,
  updateSponsor,
  deleteSponsor,
};
