import React, { useState } from "react";

import "./debitCard.scss";

const initialValues = {
  name: "",
  cardNumber: "",
  expiredDate: "",
  cvv: "",
};

function Debitcard() {
  const [debitCardList, setDebitCardList] = useState([]);
  const [formDebit, setFormDebit] = useState(initialValues);
  const [cardDetail, setCardDetail] = useState({});
  const [hideNumber, setHideNumber] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormDebit({
      ...formDebit,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setDebitCardList([...debitCardList, formDebit]);
    setFormDebit(initialValues);
  };

  const formatCardNumber = (value) => {
    const valueList = value.split("");
    const newValue = valueList.reduce(
      (a, b, index) =>
        index !== 0 && index % 4 === 0
          ? hideNumber && index < 12
            ? (a += " *")
            : (a += ` ${b}`)
          : hideNumber && index < 12
          ? (a += "*")
          : (a += b),
      ""
    );

    return newValue;
  };

  return (
    <div className="container">
      {Object.keys(cardDetail).length > 0 && (
        <div className="debit-card-detail-container">
          <button
            className="button-hide-card"
            onClick={() => setHideNumber(!hideNumber)}>
            Hide card number
          </button>
          <div className="debit-card-detail">
            <p>{cardDetail.name}</p>
            <p>{formatCardNumber(cardDetail.cardNumber)}</p>
            <div className="debit-card-detail-footer">
              <p>Thru: {cardDetail.expiredDate}</p>
              <p>CVV: {hideNumber ? "***" : cardDetail.cvv}</p>
            </div>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="debit-card-form">
          <input
            name="name"
            type="text"
            className="debit-card-input"
            placeholder="Name"
            value={formDebit.name}
            onChange={handleChange}
            required
          />
          <input
            name="cardNumber"
            type="number"
            className="debit-card-input"
            placeholder="Card Number"
            value={formDebit.cardNumber}
            onChange={handleChange}
            required
          />
          <div className="debit-card-sub-info">
            <input
              name="expiredDate"
              type="text"
              className="debit-card-input flex-45"
              placeholder="Expired Date"
              value={formDebit.expiredDate}
              onChange={handleChange}
              required
            />
            <input
              name="cvv"
              type="text"
              className="debit-card-input flex-45"
              placeholder="CVV"
              value={formDebit.cvv}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      <div className="debit-member-list">
        <p className="debit-member-list-title">Member List</p>
        {debitCardList.map((record, index) => (
          <div
            className="debit-member-item"
            key={index}
            onClick={() => setCardDetail(record)}>
            <p>{index + 1}</p>
            <p>{record.name}</p>
            <p>{record.cardNumber}</p>
            <p>{record.expiredDate}</p>
            <p>{record.cvv}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Debitcard;
