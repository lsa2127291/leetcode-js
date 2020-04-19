# Write your MySQL query statement below
Select Department.Name as Department, Employee.Name as Employee, Salary 
from Employee join Department on Employee.DepartmentId = Department.Id 
where Salary = (Select Max(Salary) from Employee as b group by b.DepartmentId having Employee.DepartmentId = b.DepartmentId)

// 更强性能，在连接的时候过滤让查询表更小

select c.Name as Department, a.Name as Employee, a.Salary as Salary from (
select * from Employee
) a
inner join (
select max(Salary) as Salary, DepartmentId from Employee group by DepartmentId
) b on a.Salary = b.Salary and a.DepartmentId = b.DepartmentId
left join (
select * from Department
) c on a.DepartmentId = c.Id where c.Name is not null