import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Wrapper = styled.div`
  display: flex;
  max-width: 600px;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  margin-right: 20px;
`;

export const Fields = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

export const Stock = styled.div`
  display: flex;
  justify-content: space-between;

  img {
    height: 120px;
    width: 200px;
    border-radius: 10px;
    padding: 10px;
    margin-right: 10px;
    background: #fff;
  }
`;

export const Price = styled.div`
  margin: 15px 0;
  font-size: 20px;
  font-weight: bold;
`;

export const Table = styled.table`
  border: 1px solid #ccc;
  border-collapse: separate;
  border-radius: 10px;
  padding: 15px;
  width: 100%;

  thead {
    th:first-child {
      background: none;
    }

    th:nth-child(2) {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }

    th:last-child {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }

    tr:first-child:hover {
      background: none;
    }
  }

  th {
    background: #ccc;
    color: #000;
    padding: 15px;
    text-align: center;
  }

  tr:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;
