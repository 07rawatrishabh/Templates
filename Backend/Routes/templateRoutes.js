const express = require('express');
const router = express.Router();
const Template = require('../Models/Template');

// GET /template/all
router.get('/all', async (req, res) => {
  try {
    const templates = await Template.find();
    res.status(200).json({
      success: true,
      result: templates
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
});


router.get('/:id', async (req, res) => {
    try {
      const template = await Template.findById(req.params.id);
      if (!template) {
        return res.status(404).json({
          success: false,
          message: 'Template not found'
        });
      }
      res.status(200).json({
        success: true,
        result: template
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: err.message
      });
    }
  });

  
module.exports = router;
