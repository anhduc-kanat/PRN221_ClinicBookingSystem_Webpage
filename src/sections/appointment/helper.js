export const getStatusText = (statusMeeting) => {
    switch (statusMeeting) {
      case 1:
        return 'Done';
      case 2:
        return 'Check in';
      case 3:
        return 'Waiting';
      case 4:
        return 'Future';
      case 5:
        return 'InQueue';
      case 7: 
        return 'InTreatment';
      default:
        return 'Unknown';
    }
};
export const getStatusClasses = (statusApp) => {
  switch (statusApp) {
    case 1:
      return 'text-green-500 border-green-500'; // Assuming green for 'Done'
    case 2:
      return 'text-blue-500 border-blue-500'; // Assuming blue for 'OnGoing'
    case 3:
      return 'text-orange-500 border-orange-500'; // Assuming orange for 'Scheduled'
    case 4:
      return 'text-red-500 border-red-500'; // Assuming red for 'Rejected'
    default:
      return 'text-gray-500 border-gray-500'; // Assuming grey for 'Unknown'
  }
};
export const formatCurrency = (amount) =>{

  if(!amount){
    return "0";
  }
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
};