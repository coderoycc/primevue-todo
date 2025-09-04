import moment from "moment";

export const formatDate = (datestr) => {
  if (!datestr) return 'S/F';
  
  return moment(datestr).format('DD [de] MMM. [del] YYYY');
}