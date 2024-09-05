import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Input from '@ui/input';
import Button from '@ui/button';

import { useAppDispatch, useAppSelector } from '@store/hooks';
import { updateUsername } from '@features/user/user-slice';

function CreateUser() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(store => store.user);
  const inputRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState('');

  // Focus the input element on every render.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!username) return;
    dispatch(updateUsername(username));
    navigate(location.state?.pathname || '/menu');
  }

  return (
    <div className="text-center">
      <h4 className="mb-5 text-stone-600">
        {user.username
          ? `🍕 ${user.username}, Welcome to the Fast React Pizza!`
          : '👋 Welcome! Please start by telling us your name:'}
      </h4>
      {user.username ? (
        <Button asChild>
          <Link to="/menu">Continue Ordering</Link>
        </Button>
      ) : (
        <form className="mx-auto flex max-w-md" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            ref={inputRef}
            value={username}
            placeholder="Your full name"
            onChange={e => setUsername(e.target.value)}
            className="rounded-e-none border-e-0 text-base"
            required
          />
          <div className="shrink-0">
            <Button className="rounded-s-none sm:text-base">
              Start Ordering
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default CreateUser;
