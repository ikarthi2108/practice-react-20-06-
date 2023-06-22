import React from 'react';

const sectionStyle = {
  backgroundColor: '#f5f5f5',
  padding: '20px',
};

const titleStyle = {
  color: '#333',
  fontSize: '24px',
};

const imageStyle = {
  width: '200px',
  height: '200px',
  objectFit: 'contain',
  borderRadius: '20%',
};
const contactInfoStyle = {
  color: '#333',
  fontSize: '16px',
};


const Contact = () => {
  return (
    <div style={sectionStyle}>
      <h3 style={titleStyle}>Contact Section</h3>
      <img
        src="https://tse3.mm.bing.net/th?id=OIP.a_VOb9rBUgV7nu2wsqm1KQHaEK&pid=Api&P=0&h=180"
        alt='img'
        style={imageStyle}
      />
      <p style={contactInfoStyle}>
        Email: info@zomato.com
        <br />
        Phone: +1 123-456-7890
        <br />
        Address: 123 Main Street, City, Country
      </p>
    </div>
  );
};

export default Contact;
