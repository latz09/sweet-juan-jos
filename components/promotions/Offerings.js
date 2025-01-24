import OfferingGroup from "./OfferingGroup";

const Offerings = ({data}) => {
    
    return ( <div className="grid  gap-24 mt-12 max-w-4xl mx-auto">
        {
            data.map((groupItems, index) => {
                return (
                  <OfferingGroup key={index} groupItems={groupItems} />
                )
            })
        }
    </div> );
}
 
export default Offerings;