const { Participant, Item } = require('../models'); 


const createParticipant = async (req, res) => {
  try {
    const { name, email, itemId } = req.body; 

    
    const participant = await Participant.create({
      name,
      email,
      itemId, 
    });

    res.status(201).json(participant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getParticipants = async (req, res) => {
  try {
    const { itemId } = req.params;

    const participants = await Participant.findAll({
      where: {
        itemId, 
      },
    });

    res.json(participants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const updateParticipant = async (req, res) => {
  try {
    const { id } = req.params; 
    const participant = await Participant.findByPk(id);

    if (participant) {
      await participant.update(req.body); 
      res.json(participant);
    } else {
      res.status(404).json({ error: 'Pjesmarrësi nuk u gjet' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const deleteParticipant = async (req, res) => {
  try {
    const { id } = req.params; 
    const participant = await Participant.findByPk(id);

    if (participant) {
      await participant.destroy(); 
      res.json({ message: 'Pjesmarrësi u fshi me sukses' });
    } else {
      res.status(404).json({ error: 'Pjesmarrësi nuk u gjet' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createParticipant,
  getParticipants,
  updateParticipant,
  deleteParticipant,
};
