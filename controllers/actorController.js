const Actor = require('../models/Actor');

// Get awards for an actor
exports.getActorAwards = async (req, res) => {
  try {
    const actor = await Actor.findById(req.params.actorId).select('awards');
    if (!actor) {
      return res.status(404).json({ message: 'Actor not found' });
    }
    res.json(actor.awards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};