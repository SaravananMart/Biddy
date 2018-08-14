class TempBiddingService

	def self.total_bid_count(params)
		month = {}
		params[:pid] = 1
		if params[:pid]
			dates = Bidding.where('from_date >= ? and to_date <= ? and product_id = ?', Date.today.beginning_of_month - 1.month, Date.today.beginning_of_month + 4.month, params[:pid]).order("from_date ASC")
		else
			dates = Bidding.where('from_date >= ? and to_date <= ? ', Date.today.beginning_of_month - 1.month, Date.today.beginning_of_month + 4.month).order("from_date ASC")
		end
		temp = []
		count = {}

		dates.each do |date|
			unless temp.include? date.from_date.strftime("%m").to_i  
				temp << date.from_date.strftime("%m").to_i 
				count = {}
			end				

			(1..31).each do |d|
				if date.from_date.strftime("%d").to_i <= d and date.to_date.strftime("%d").to_i >= d
					count[d] = count[d].to_i + 1
				end					
				
			end
			month[date.from_date.strftime("%m").to_i] = count
		end
		
		data = []
		month.each do |key, value|
			value.each do |key1, value1|
				temp_data = {}
				temp_data["start"] = Date.new(2018, key, key1) #date
				dates.each do |date|
					if temp_data["start"] >= date.from_date and temp_data["start"] <= date.to_date and params[:uid]
						temp_data["hexColor"] = 'F65926' #red
					else
						temp_data["hexColor"] = '79D207' #green
					end
				end
				temp_data["title"] = value1 #count
				data << temp_data
			end
		end
		return data
	end


	def self.get_approved_dates(params)
		uid = params[:uid]
		pid = params[:pid]
		data = []
		dates = Bidding.where('user_id = ? and product_id = ?', uid, pid).order("from_date ASC")
		dates.each do |date|
			temp_data = {}
			temp_data["start"] = date.from_date 
			temp_data["end"] = date.to_date
			if date.status == 0
				temp_data["hexColor"] = 'DE0101' #rejected
				temp_data["title"] = 'R'
			elsif date.status == 1
				temp_data["hexColor"] = 'FF7000' #partially approved
				temp_data["title"] = 'P'
			elsif date.status == 2
				temp_data["hexColor"] = '227C00' #approved
				temp_data["title"] = 'A'
			end
			data << temp_data
		end
		return data
	end


	def self.get_bid_details_for_date(params)
		date = Date.parse(params[:date])
		pid = params[:pid]
		details = Bidding.where("from_date <= ? and to_date >= ? and product_id = ?", date, date, pid)
		return details
	end


	def self.approve_bid_dates
		bid_id = 9
		user_id = 2
		bidding = ''
		dates = []
		bid_details = Bidding.find_by(:id => bid_id)
		dates.each do |date|
			bidding =	Bidding.create(:from_date => date, :to_date => date, :days => bid_details.days, :markup => bid_details.markup, :user_id => user_id, :product_id => bid_details.product_id, :status => 1)
		end
		
		if bidding and Bidding.delete(65)
			return true
		else
			return false
		end
	end


end