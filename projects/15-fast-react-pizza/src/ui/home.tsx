import CreateUser from '@features/user/create-user';

function Home() {
  return (
    <div className="flex flex-col gap-12">
      <h1 className="text-center leading-tight">
        The best pizza.
        <br />
        <span className="text-yellow-400">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <CreateUser />
    </div>
  );
}

export default Home;
