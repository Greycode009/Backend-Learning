# Day 12 - Practice & Revisit

## Today's Progress

Today was focused on **practicing and strengthening what I learned in the previous days** instead of adding another major feature.

- Revisited **Search, Filtering, Sorting & Pagination**
- Practiced building **combined query parameters**
- Tested different combinations of **search, author, sorting and pagination**
- Practiced reasoning about **MongoDB `$or` conditions and filters**
- Debugged and understood the **pagination `skip` calculation**
- Reviewed the complete **Request → Validation → Controller → Service → Database → Response** flow

## What I Learned

Today's biggest lesson was that **knowing a concept and being able to use it are two different things**.
I practiced taking a requirement and deciding which backend features were needed to solve it.

I also practiced debugging instead of immediately looking for the solution. For example,
I revisited how pagination works and understood why:

`skip = (page - 1) × limit`

is necessary to correctly select the requested page.

## Key Takeaway

**Practice is where concepts become understanding.**

Today was less about writing new code and more about making sure
I can **use, combine, test, and debug the concepts I've already learned.**
