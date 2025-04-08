export default async function handler(req, res) {
    const { to, subject, text } = req.body;
    
    // Configuration réelle avec Nodemailer ou service email
    console.log('Email simulé :', { to, subject, text });
    
    res.status(200).json({ success: true });
  }