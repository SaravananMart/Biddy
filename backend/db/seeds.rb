user_create_array = [{name: 'HR', email: 'hr@sample.com', user_type: 'HR', password: 'demo1234'},
                     {name: 'Employee', email: 'employee@sample.com', user_type: 'EMPLOYEE', password: 'demo1234'}]
User.create(user_create_array)
puts('User seed completed')

company_asset_array = [{name: 'Monitor', count: 10}, {name: 'Mouse', count: 10}, {name: 'Laptop', count: 15}]
CompanyAsset.create(company_asset_array)
puts('Company Asset seed completed')

employee = User.find_by(:email=>'employee@sample.com')
employee_asset_array = [{name: 'Monitor', count: 1, status: 1, returned: false},
                        {name: 'Mouse', count: 1, status: 1, returned: false}]
employee.user_assets.create(employee_asset_array)
puts('Employee Asset seed completed')
