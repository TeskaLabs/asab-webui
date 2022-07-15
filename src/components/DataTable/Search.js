import React from 'react';

import {
	InputGroup, InputGroupText, Input, InputGroupAddon
} from 'reactstrap';

const Search = ({ search, filterValue, setFilterValue }) => {

	return (
        <div className="float-right ml-3 data-table-search">
            <InputGroup>
                {search.icon && 
                    <InputGroupAddon addonType="prepend">
                    <InputGroupText><i className={search.icon}></i></InputGroupText>
                    </InputGroupAddon>
                }
                <Input
                    value={filterValue}
                    onChange={e => setFilterValue(e.target.value)}
                    placeholder={search.placeholder}
                    type="text"
                    bsSize="sm"
                />
            </InputGroup>
        </div>
	);
}

export default Search;
