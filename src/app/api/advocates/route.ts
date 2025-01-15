import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData, type specialties} from "../../../db/seed/advocates";

import type { NextApiRequest, NextApiResponse } from 'next'
 

/**
 * right now we only support name searches
 **/
export async function GET(req: NextApiRequest, res) {
  // Uncomment this line to use a database
  // const data = await db.select().from(advocates);
 const { searchParams } = new URL(req.url as string)

  const nameQuery = searchParams.get('name')
  const pageQuery = searchParams.get('pageNumber')

  // this would become a SQL query further down
  let data = advocateData;

  /**
   * we could do all of this here, but searching for everything
   * doesn't seem like good ux to me.. i'd talk to a designer
   * or a user researcher to get more info on what our users
   * want
   **/
  //  const filteredAdvocates = advocates.filter((advocate) => {
  //    return (
  //      advocate.firstName.includes(searchTerm) ||
  //      advocate.lastName.includes(searchTerm) ||
  //      advocate.city.includes(searchTerm) ||
  //      advocate.degree.includes(searchTerm) ||
  //      advocate.specialties.includes(searchTerm) ||
  //      advocate.yearsOfExperience.includes(searchTerm)
  //    );
  if(nameQuery){
    data = data.filter(d=> {
      return d.firstName.toLowerCase().includes(nameQuery.toLowerCase())
        || d.lastName.toLowerCase().includes(nameQuery.toLowerCase())
    })
  }
  let pagedData = data;
  if(pageQuery){
    pagedData.splice()
  } else {
    pagedData.splice(0,3)
  }

  return Response.json({ data });
}

export interface Advocate {
    firstName: string,
    lastName: string,
    city: string,
    // this should probably be a const as well
    degree: string,
    specialties: (typeof specialties[number])[],
    yearsOfExperience: number,
    
    /**
     * unformatted phone number
     **/
    phoneNumber: number,

}
