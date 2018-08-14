class BiddingService

	def self.get_free_bid_dates(params)
		bid_values = []
		remaining_dates = []
		clashing_dates = {}
		removed_dates = []
		best_bids = {}
		bid_ids = []
		dates = []
		bids = Bidding.where(:product_id => params[:pid]).order("days DESC")
		bids.each_with_index do |bid, index1|
			bid_ids << bid.id
			temp_dates = []
			temp_best_bids = []
			bids.each_with_index do |bid1, index2|
				if (bid.from_date..bid.to_date).overlaps?(bid1.from_date..bid1.to_date) && index1 != index2
					unless removed_dates.include? bid1.id
						temp_dates.push(bid1.id)
						temp_best_bids.push( 1000 * (bid1.markup.to_f / 100) * bid1.days )
					end
				end
			end
			temp_dates.push(bid.id)
			temp_best_bids.push( 1000 * (bid.markup.to_f / 100) * bid.days )
			best_bids[bid.id] = temp_best_bids
			temp_dates.each_with_index do |dates, index|
				if index!= temp_best_bids.index(temp_best_bids.max)
					removed_dates << dates
				end
			end
			clashing_dates[bid.id] = temp_dates
		end

		bid_ids.uniq.sort { |x, y| x <=> y }
		removed_dates.uniq.sort { |x, y| x <=> y }
		remaining_dates = bid_ids - removed_dates
		count = 0
		(1..30).each do |d|
			remaining_dates.each do |date|
				unless d > bids.find(date).from_date.strftime("%d").to_i && d < bids.find(date).to_date.strftime("%d").to_i
					count+=1
				end
			end
			if count == 2
				dates << d
			end
			count = 0
		end
		best_bid=  []
		remaining_dates.each_with_index do |date|
			best_bid << bids.find(date)
		end

		return {"free_dates" => dates, "best_bid" => best_bid}
	end

	def self.get_bid_count(params)

		count = []
		if params
			id = params[:uid]
			Product.where(:id => id).each do |bid|
				temp_count = {}
				temp_count[bid.id] = Bidding.where(:product_id => bid.id).count
				count << temp_count
			end
		elsif
			Product.all.each do |bid|
				temp_count = {}
				temp_count[bid.id] =  Bidding.where(:product_id => bid.id).count
				count << temp_count
			end
		end
		return count
	end

	def self.total_bid_count(params)
		month = {}
		id = params[:pid] 
		if (id)
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
					if temp_data["start"] >= date.from_date and temp_data["start"] <= date.to_date
						if date.status == 0
							temp_data["hexColor"] = 'E3D309' #yellow
						else
							temp_data["hexColor"] = '79D207' #green
						end
						temp_data["status"] = date.status
					end
				end
				temp_data["title"] = value1 #count
				if value1 >= 1
					if Bidding.where("from_date = ? and status >= ?", temp_data["start"], 1).count > 0
						temp_data["hexColor"] = '79D207'
					end
				end


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
				temp_data["hexColor"] = 'E3D309' #Not approved
				temp_data["title"] = 'NA'
			elsif date.status == 1
				temp_data["hexColor"] = 'FF7000' #partially approved
				temp_data["title"] = 'PA'
			elsif date.status == 2
				temp_data["hexColor"] = '227C00' #approved
				temp_data["title"] = 'A'
			else
				temp_data["hexColor"] = 'F1140D' #rejected
				temp_data["title"] = 'R'
			end
			data << temp_data
		end
		return data
	end

	def self.get_all_bid_dates(params)
		pid = params[:pid]
		data = []
		dates = Bidding.where('product_id = ?', pid).order("from_date ASC")
		dates.each do |date|
			temp_data = {}
			temp_data["start"] = date.from_date
			temp_data["end"] = date.to_date
			if date.status == 0
				temp_data["hexColor"] = 'E3D309' #Not approved
				temp_data["title"] = 'NA'
			elsif date.status == 1
				temp_data["hexColor"] = 'FF7000' #partially approved
				temp_data["title"] = 'PA'
			elsif date.status == 2
				temp_data["hexColor"] = '227C00' #approved
				temp_data["title"] = 'A'
			else
				temp_data["hexColor"] = 'F1140D' #rejected
				temp_data["title"] = 'R'
			end
			data << temp_data
		end
		return data
	end


	def self.get_bid_details_for_date(params)
		date = Date.parse(params[:date])
		pid = params[:pid]
		details = []
		biddings = Bidding.where("from_date <= ? and to_date >= ? and product_id = ?", date, date, pid).to_json(:include => {:user => {:only => :name}})

		to_date = (Bidding.first.from_date + (Bidding.first.days).days).strftime("%d/%m/%Y")
		JSON.parse(biddings).each_with_index do |d, index|
			temp = {}
			temp["id"] = d['id']
			from_date = d['from_date']
			temp["from_date"] = Date.parse(from_date).strftime("%d/%m/%Y")
			temp["to_date"] = (Date.parse(to_date) - 1.days).strftime("%d/%m/%Y")
			temp["days"] = d['days']
    		temp["markup"] = d['markup']
			temp["product_id"] = d['product_id']
			temp["user_id"] = d['user_id']
			temp["name"] = d["user"]["name"]
			if d['status'] == 0
				temp["status"] = "Not approved"
			elsif d['status'] == 1
				temp["status"] = "Partially approved"
			elsif d['status'] == 2
				temp["status"] = "Approved"
			else
				temp["status"] = "Rejected"
			end

			temp["profit"] =  (1000 * (d['markup'].to_f / 100) * 1)
			details << temp
		end
		
		return details
	end

	def self.approve_bid_dates(params)
		id = params[:id]
		user_id = params[:user_id]
		product_id = params[:product_id]
		from_date = Date.parse(params[:from_date])
		to_date = Date.parse(params[:to_date])
		days = params[:days]

		status = Bidding.find(id).update(:status => 1)

		status_count = Bidding.where("product_id = ? and user_id = ? and status = ? and (from_date >= ? or from_date <= ?) ", product_id, user_id, 1, from_date, to_date).count

		if status_count == days
			(1..days).each do |d|
				Bidding.where("product_id = ? and user_id = ? and status = ? and (from_date >= ? or from_date <= ?)", product_id, user_id, 1, from_date, to_date).update(:status => 2)
			end
		end


		if status
			return true
		else
			return false
		end
	end


end
