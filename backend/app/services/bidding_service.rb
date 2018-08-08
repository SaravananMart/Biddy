class BiddingService


	def self.get_free_bid_dates
		bid_values = []
		remaining_dates = []
		clashing_dates = {}
		removed_dates = []
		best_bids = {}
		bid_ids = []
		dates = []
		bids = Bidding.all.order("days DESC")
		bids.each_with_index do |bid, index1|
			bid_ids << bid.id
			temp_dates = []
			temp_best_bids = []
			bids.each_with_index do |bid1, index2|
			  if (bid.from_date..bid.to_date).overlaps?(bid1.from_date..bid1.to_date) && index1 != index2
				 unless removed_dates.include? bid1.id
				 		# puts removed_dates.to_s
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

			return dates
	end

end
