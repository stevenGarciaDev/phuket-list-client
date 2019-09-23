import styled, { keyframes } from 'styled-components';

const DropDown = styled.div`
  position: absolute;
  margin-top: 40px;
  width: 100%;
  z-index: 2;
  border: 1px solid #DCDCDC;
`;

const DropDownItem = styled.div`
  border-bottom: 1px solid #DCDCDC;
  background: ${props => (props.highlighted ? '#f7f7f7' : 'white')};
  padding: 1rem;
  transition: all 0.2s;
  ${props => (props.highlighted ? 'padding-left: 2rem;' : null)};
  display: flex;
  align-items: center;
  border-left: 5px solid ${props => (props.highlighted ? '#17a2b8' : 'white')};
`;

const glow = keyframes`
  from {
    box-shadow: 0 0 0px yellow;
  }
  to {
    box-shadow: 0 0 10px 1px yellow;
  }
`;

const SearchStyles = styled.div`
  position: relative;
  input {
    width: 100%;
    padding: 3px;
    border: 0;
    font-size: 1rem;
    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }
`;

export { DropDown, DropDownItem, SearchStyles };
