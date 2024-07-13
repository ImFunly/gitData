import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './rest/userSlice';

const UserComponent = () => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const userStatus = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  const handleFetchUser = () => {
    if (username) {
      dispatch(fetchUser(username));
    }
  };

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Insertar nombre de usuario"
      />
      <button onClick={handleFetchUser}>Buscar usuario</button>
      {userStatus === 'loading' && <p>Cargando..</p>}
      {userStatus === 'succeeded' && user && (
        <div>
          <img src={user.avatar_url} alt={user.login} width={100} />
          <h2>{user.name}</h2>
          <p>Nombre de usuario: {user.login}</p>
          <p>Seguidores: {user.followers}</p>
          <p>Repositorios públicos: {user.public_repos}</p>
        </div>
      )}
      {userStatus === 'failed' && <p>{error}</p>}
    </div>
  );
};

export default UserComponent;
