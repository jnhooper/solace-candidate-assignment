## notes on libs used

### styling/ui
This is set up with some light tailwind and shadcn components.
Ideally I'd like to spend more time styling this to make is snazzy, nice loading states
etc, but not within the time limit. I also would have like to set up proper design tokens
(ideally with amazon's styledictionary) and some sass support.

### querying
I opeted to use react-query. This gives us some nice caching out of the box and some
fancy dev tools. 

### tooling
I'm using [volta](https://volta.sh/) to ensure I'm using the right node. it's great,
you should check it out

## would have should have could have
It would have been nice to come up with some pattern for the specialties.. those are kinda
a drag to look at. 

I also would have like to have used react-table for some filtering/sorting, but i didn't
have time

## changes to ui

### searching
I opted to not search everything based on one query. I dont think that ui works well for
end users. If given more time i would have added more filters so they can search on
name, or specialty, or state etc etc. Different filters might require different ui,
for example a combobox for the state.

Another part of search that changed is we are now doing it on the server. This is because
I am assuming that the data we will be dealing with is going to be a lot larger than
this sample size. Ideally this would be done server side with SSR, but the instructions said to
limit server actions.

If we wanted to keep it client side filtering i would have installed lodash and done some
debouncing on the onChange event. As it is I personally like the pattern of searching and
hitting enter to get the results. I also think it plays a little nicer with screen readers
and other a11y concerns

I opted to add the search params to the url because it makes it easier to share search results
with other users, if they need to send a search to someone else or talk with a customer
support rep, it's easy to replicate.

Finally, this is where react-table would have come in handy, because it has some nice
support for server side controls. Since we'd doing server side searching we need to handle
pagination, sorting, and other filters on the server as well.



