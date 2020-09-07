import styled from 'styled-components';

export const Table = styled.table`
  border: 1px solid #ccc;
  border-collapse: separate;
  border-radius: 10px;
  padding: 15px;
  width: 100%;

  thead {
    width: calc(100% - 4px);
    display: block;

    margin-bottom: 15px;
  }

  tbody {
    width: 100%;
    display: block;

    max-height: 500px;
    overflow-y: auto;

    ::-webkit-scrollbar {
      width: 4px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 40px;
    }

    ::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 40px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }

  tr:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const Td = styled.td`
  text-align: center;
  padding: 15px;
  width: 10%;
`;

export const Th = styled.th`
  background: #ccc;
  color: #000;
  text-align: center;
  padding: 15px;
  width: 10%;

  :first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  :last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;
