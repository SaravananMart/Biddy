class UserProductService

	def self.get_user_products(params)
		id = params[:uid].to_i
		products = UserProduct.where(:user_id => id).to_json(:include => {:product => { }})
		return products
	end

end
