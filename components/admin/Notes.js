const Notes = ({ data }) => {
    return (
      <div>
        <h2 className='text-2xl font-bold mb-4'>Additional Notes</h2>
        {data.map(note => (
          <div key={note._key} className='mb-4'>
            <h3 className='text-xl font-bold'>{note.title}</h3>
            <p>{note.description}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default Notes;
  