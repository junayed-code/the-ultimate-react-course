import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from '@ui/input';

function SearchOrder() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;
    navigate(`/order/${search}`);
    (document.activeElement as HTMLInputElement)?.blur();
  };

  return (
    <form onSubmit={handleSubmit} className="w-36 shrink-0 sm:w-64">
      <Input
        id="search"
        type="search"
        value={search}
        placeholder="Search order by id"
        onChange={(e) => setSearch(e.target.value)}
        className="origin-right rounded-full border-none bg-yellow-100/80 placeholder-stone-500 ring-yellow-500 ring-offset-yellow-400 transition-all duration-300 focus-visible:scale-x-110 focus-visible:ring-1 focus-visible:ring-offset-2 sm:px-4 sm:py-2 md:origin-center"
      />
    </form>
  );
}

export default SearchOrder;
