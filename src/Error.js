const Error = ({ message }) => {
   return (
      <div className="error">
         <h1>Error!</h1>
         <p>{message}</p>
      </div>
   );
}
 
export default Error;