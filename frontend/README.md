## FE
- le chiamate api vengono definite tutte dentro src/hooks/usePlace.js

- vengono esportate e richiamate all interno del global context src/context/GlobalContext

- esempio di utilizzo delle chiamate 

- const { usePlace, addPlace } = useGlobalContext();

- usePlace({name: '', id: ''})